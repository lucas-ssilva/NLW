module.exports = async function(db, {proffyValue, classValue, classScheduleValue}) {
    //inserir dados na tabela de proffys 
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `)

    const proffy_id = insertedProffy.lastID

    //inserir dados na tabela classes
    const insertClass = await db.run(`
            INSERT INTO classes (
                subject,
                cost,
                proffy_id
            ) VALUES (
                "${classValue.subject}",
                "${classValue.cost}",
                "${proffy_id}"
            );
    `)

    const class_id = insertClass.lastID

    //inserir dados na tabela classes schedule
    const insertedAllClassSchedulesValues = classScheduleValue.map((value) => {
        return db.run(`
        INSERT INTO class_schedule (
            class_id,
            weekday,
            time_from,
            time_to
        ) VALUES (
            "${class_id}",
            "${value.weekday}",
            "${value.time_from}",
            "${value.time_to}"
        );
     `)
    })

    //aqui todos os dbs runs vão ser executados 
    await Promise.all(insertedAllClassSchedulesValues)
}