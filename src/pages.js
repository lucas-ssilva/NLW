const { subjects, weekdays, getSubject, convertHoursToMinutos } = require('./database/utils/format')
const Database = require('./database/db')

//funcionalidades
function pageLanding(req, res) {
    return res.render("index.html")
}
async function pageStudy(req, res) {
    const filters = req.query

    if(!filters.subject || !filters.weekday || !filters.time) {
        return res.render("study.html", {filters, subjects, weekdays}) // render é do nunjucks 
    }

    const timeToMinutes = convertHoursToMinutos(filters.time)

    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS(
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timeToMinutes}
            AND class_schedule.time_to > ${timeToMinutes}
        )
        AND classes.subject = '${filters.subject}'
    `

    //caso haja erro na hora da consulta do banco de dados 
    try {

        const db = await Database;
        const proffys = await db.all(query)

        proffys.map((proffy) => {
            proffy.subject = getSubject(proffy.subject)
        })

        res.render('study.html', {proffys, subjects, filters, weekdays})
    } catch (error) {
        console.log(error)
    }
}
function pageGiveClasses(req, res) {
    return res.render("give-classes.html", {subjects, weekdays})
}

async function saveClasses(req, res) {
    //adicionar dados ao proffys
    const createProffy = require('./database/createProffy')

    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio,
    }

    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost,
    }

    const classScheduleValue = req.body.weekday.map((weekday, index) => {
        return {
            weekday: weekday,
            time_from: convertHoursToMinutos (req.body.time_from[index]),
            time_to: convertHoursToMinutos(req.body.time_to[index]),
        }
    })

    try {
        const db = await Database
        await createProffy(db, {proffyValue, classValue,classScheduleValue })
        //caso os dados sejam adicionados direciona para a tela study
        let queryString = "?subject=" + req.body.subject
        queryString += "&weekday=" + req.body.weekday[0]
        queryString += "&time=" + req.body.time_from[0]

        return res.redirect("/study/" + queryString)
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
}