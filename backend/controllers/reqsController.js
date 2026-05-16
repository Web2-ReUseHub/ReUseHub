const db = require('../models');

const { Req, User, UsedItem, Message } = db;

// إضافة طلب جديد من المستخدم الحالي
exports.createRequest = async (req, res) => {
  try {
    const user_id = req.user?.user_id;
    const { used_item_id, comment, rating } = req.body;

    if (!user_id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const existingRequest = await Req.findOne({ where: { user_id, used_item_id } });
    if (existingRequest) {
      return res.status(400).json({ message: 'تم إرسال الطلب مسبقاً' });
    }

    const request = await Req.create({ user_id, used_item_id, comment, rating, status: 'pending' });
    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// جلب طلبات المستخدم الحالي (الطلبات التي أرسلها)
exports.getMyRequests = async (req, res) => {
  try {
    const user_id = req.user?.user_id;
    if (!user_id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const requests = await Req.findAll({
      where: { user_id },
      include: [
        {
          model: UsedItem,
          as: 'product',
          include: [{ model: User, as: 'seller' }],
        },
      ],
    });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// جلب طلبات البائع الحالي (الطلبات المستقبلة)
exports.getReceivedRequests = async (req, res) => {
  try {
    const seller_id = req.user?.user_id;

    if (!seller_id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const requests = await Req.findAll({
      include: [
        {
          model: UsedItem,
          as: 'product',
          where: { seller_id },
        },
        {
          model: User,
          as: 'buyer',
          attributes: [
            'user_id',
            'f_name',
            'l_name',
            'phone',
            'email',
            'address' // بدل city
          ],
        },
      ],
      order: [['req_id', 'DESC']],
    });

    res.json(requests);
  } catch (error) {
    console.error('RECEIVED REQUESTS ERROR:', error);
    res.status(500).json({
      error: error.message,
    });
  }
};

// جلب كل الطلبات (لأغراض إدارية)
exports.getRequests = async (req, res) => {
  try {
    const requests = await Req.findAll({ include: [{ model: User }, { model: UsedItem }] });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// قبول طلب من البائع
exports.acceptRequest = async (req, res) => {
  try {
    const seller_id = req.user?.user_id;
    const { req_id } = req.params;

    if (!seller_id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const request = await Req.findByPk(req_id, {
      include: [
        { model: UsedItem, as: 'product' },
        { model: User, as: 'buyer' },
      ],
    });

    if (!request) {
      return res.status(404).json({ message: 'الطلب غير موجود' });
    }

    // التحقق من أن المستخدم الحالي هو البائع
    if (request.product.seller_id !== seller_id) {
      return res.status(403).json({ message: 'ليس لديك صلاحية قبول هذا الطلب' });
    }

    // تحديث حالة الطلب
    await request.update({ status: 'accepted' });

    // الحصول على بيانات البائع الحالي
    const seller = await User.findByPk(seller_id, {
      attributes: ['phone', 'f_name', 'l_name'],
    });

    // إنشاء رسالة للمشتري برقم البائع
    const message = await Message.create({
      sender_id: seller_id,
      receiver_id: request.user_id,
      req_id: req_id,
      content: `تمت الموافقة على طلبك للمنتج: ${request.product.description}`,
      sender_phone: seller.phone,
    });

    res.json({
      message: 'تم قبول الطلب وإرسال رقمك للمشتري',
      request: request,
      notification: message,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// رفض طلب من البائع
exports.rejectRequest = async (req, res) => {
  try {
    const seller_id = req.user?.user_id;
    const { req_id } = req.params;

    if (!seller_id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const request = await Req.findByPk(req_id, {
      include: [
        { model: UsedItem, as: 'product' },
      ],
    });

    if (!request) {
      return res.status(404).json({ message: 'الطلب غير موجود' });
    }

    // التحقق من أن المستخدم الحالي هو البائع
    if (request.product.seller_id !== seller_id) {
      return res.status(403).json({ message: 'ليس لديك صلاحية رفض هذا الطلب' });
    }

    // تحديث حالة الطلب
    await request.update({ status: 'rejected' });

    res.json({ message: 'تم رفض الطلب' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// حذف طلب
exports.deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;
    await Req.destroy({ where: { req_id: id } });
    res.json({ message: 'Request deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

