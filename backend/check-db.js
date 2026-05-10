const db = require('./models');

async function checkTables() {
  try {
    const result = await db.sequelize.query("SHOW TABLES;");
    console.log("📊 الجداول الموجودة في قاعدة البيانات:");
    console.log(result[0]);
    
    // التحقق من أعمدة جدول useditems إذا كان موجوداً
    try {
      const columns = await db.sequelize.query("DESCRIBE useditems;");
      console.log("\n📋 أعمدة جدول useditems:");
      console.log(columns[0]);
    } catch (err) {
      console.log("❌ جدول useditems غير موجود");
    }
    
    process.exit(0);
  } catch (error) {
    console.error("❌ خطأ:", error.message);
    process.exit(1);
  }
}

checkTables();
