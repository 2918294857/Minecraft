const express = require('express')
const router = express.Router()


var db = require('./config');

router.get('/index', async (req, res) => {
    let KSql1 = `SELECT indexesone, COUNT(*) as count from Knowledge GROUP BY indexesone`;
    let KData1 = await db(KSql1)
    let SLSql = `SELECT  COUNT(*) as count  from SkillLearning `;
    let SLData = await db(SLSql)
    let KSql2 = `SELECT indexestwo, COUNT(*) as count from Knowledge GROUP BY indexestwo`;
    let KData2 = await db(KSql2)
    let task = {}
    let AllData = {}
    task['indexesone'] = '任务'
    task['count'] = SLData.recordset[0].count
    KData1.recordset.push(task)
    AllData['Statistics'] = KData1.recordset
    AllData['details'] = KData2.recordset
    res.send(AllData);
})

router.get('/SLCount', async (req, res) => {
    let Sql = `SELECT state as name , count(*) as value from  SkillLearning GROUP BY state`;
    let Data = await db(Sql)
    let AllData = {}
    AllData['data'] = Data.recordset
    res.send(AllData);
})



router.get('/FPData', async (req, res) => {
    let FPSql = `SELECT id, functionname,state from FunctionProduction`;
    let FPData = await db(FPSql)
    let AllData = {}
    AllData['FPData'] = FPData.recordset
    res.send(AllData);
})

router.get('/LTData', async (req, res) => {
    let FPSql = `SELECT id, technicalname,state from LatestTechnology`;
    let FPData = await db(FPSql)
    let AllData = {}
    AllData['LTData'] = FPData.recordset
    res.send(AllData);
})

router.get('/SLData', async (req, res) => {
    let FPSql = `SELECT id, skillname,state from SkillLearning`;
    let FPData = await db(FPSql)
    let AllData = {}
    AllData['SLData'] = FPData.recordset
    res.send(AllData);
})

router.post('/EditSL', async (req, res) => {
    let body = req.body
    let SLSql = `update SkillLearning  set skillname='${body.skillname}' ,state='${body.state}' where id =${body.id}`;
    let SLData = await db(SLSql)
    res.send(SLData);
})

router.post('/EditLT', async (req, res) => {
    let body = req.body
    let LTSql = `update LatestTechnology  set technicalname='${body.technicalname}' ,state='${body.state}' where id =${body.id}`;
    let LTData = await db(LTSql)
    res.send(LTData);
})

router.post('/EditFP', async (req, res) => {
    let body = req.body
    let FPSql = `update FunctionProduction  set functionname='${body.functionname}' ,state='${body.state}' where id =${body.id}`;
    let FPData = await db(FPSql)
    res.send(FPData);
})

router.post('/DelSL', async (req, res) => {
    let body = req.body
    let SLSql = `delete from SkillLearning where id =${body.id}`;
    let SLData = await db(SLSql)
    res.send(SLData);
})

router.post('/DelLT', async (req, res) => {
    let body = req.body
    let LTSql = `delete from LatestTechnology  where id =${body.id}`;
    let LTData = await db(LTSql)
    res.send(LTData);
})

router.post('/DelFP', async (req, res) => {
    let body = req.body
    let FPSql = `delete from FunctionProduction  where id =${body.id}`;
    let FPData = await db(FPSql)
    res.send(FPData);
})


module.exports = router