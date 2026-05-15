const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const requestController = require('../controllers/reqsController');

// إنشاء طلب جديد
router.post('/', authMiddleware, requestController.createRequest);

// جلب طلباتي (الطلبات التي أرسلتها)
router.get('/my', authMiddleware, requestController.getMyRequests);

// جلب الطلبات المستقبلة (الطلبات على منتجاتي كبائع)
router.get('/received', authMiddleware, requestController.getReceivedRequests);

// قبول طلب
router.put('/:req_id/accept', authMiddleware, requestController.acceptRequest);

// رفض طلب
router.put('/:req_id/reject', authMiddleware, requestController.rejectRequest);

// جلب كل الطلبات (لأغراض إدارية)
router.get('/', requestController.getRequests);

// حذف طلب
router.delete('/:id', authMiddleware, requestController.deleteRequest);

module.exports = router;
