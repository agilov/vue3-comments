import {faker} from '@faker-js/faker';


function rand(min, max) {
    return faker.datatype.number({
        'min': min,
        'max': max
    });
}

function big_id() {
    return faker.random.numeric(10);
}

/**
 *
 */
export function generateUsers() {
    const users = [];

    const names = {
        agilov: 'Roman',
        balaev: 'Arif',
        lukas: 'Lukas',
        anita: 'Anita',
        pavel: 'Pavel',
        maxim: 'Maxim',
        oleg: 'Oleg',
        eugeny: 'Eugeny',
        guest: 'Guest',
        alexey: 'Alexey',
    }

    for (let i = 0; i < 10; i++) {
        users.push({
            avatar: "./avatars/" + i + ".jpeg",
            username: Object.keys(names)[i],
            id: i,
            name: Object.values(names)[i]
        })
    }

    return users;
}

/**
 *
 * @param users
 * @param commentsCount
 * @param minReplies
 * @param maxReplies
 * @returns {*[]}
 */
export function generateComments(users, commentsCount, minReplies, maxReplies) {

    const comments = [];
    let now = Math.floor(Date.now() / 1000);


    for (let i = 0; i < commentsCount; i++) {
        comments.push({
            "id": big_id(),
            "thread_id": "0",
            "audio_id": "1",
            "user": users[rand(0, 9)],
            "time_code": rand(1, 200),
            "content": faker.lorem.sentences(rand(1, 15)),
            "date_created": now,
            "date_deleted": 0,
            "replies": []
        });
        now -= rand(10, 1000);
    }

    for (let i in comments) {
        const replies = []
        let date_created = parseInt(comments[i].date_created.toString());

        for (let j = 0; j < rand(minReplies, maxReplies); j++) {
            date_created -= rand(10, 1000);
            replies.push({
                "id": big_id(),
                "thread_id": comments[i].id,
                "reply_to": replies.length > 2 ? replies[rand(0, replies.length - 1)].id : comments[i].id,
                "audio_id": "1",
                "user": users[rand(0, 9)],
                "time_code": 0,
                "content": faker.lorem.sentences(rand(1, 4)),

                "date_created": date_created,
            })
        }

        comments[i].replies = replies.reverse();
    }

    return comments;
}