import {createStore} from 'vuex'
import {generateUsers, generateComments} from "./data/generator";

export default createStore({
    state() {
        const saved = localStorage.getItem('settings');

        const settings = saved ? JSON.parse(saved) : {
            commentsCount: 20,
            minReplies: 0,
            maxReplies: 10,
        }

        const users = generateUsers();

        return {
            reply: '',
            replies: {},
            users: users,
            user: users[0],
            comments: generateComments(users, settings.commentsCount, settings.minReplies, settings.maxReplies)
        }
    },
    mutations: {
        regenerateComments(state, {commentsCount, minReplies, maxReplies}) {
            state.comments = generateComments(state.users, commentsCount, minReplies, maxReplies);
        },
        updateUser(state, idx) {
            if (!state.user || state.users[idx].id !== state.user.id) {
                state.user = state.users[idx];
            }
        },
        saveReply(state, {id, content}) {
            state.replies[id] = content;
        },
        createReply(state, {id, content, commentId, threadId}) {
            const comments = state.comments;

            if (!threadId || threadId == 0) {
                threadId = commentId;
            }

            for (let i in comments) {
                const comment = comments[i];
                if (comments[i].id == threadId) {
                    comments[i].replies.push({
                        "id": id,
                        "thread_id": threadId,
                        "reply_to": commentId,
                        "audio_id": "1",
                        "user": state.user,
                        "time_code": 0,
                        "content": content,
                        "date_created": Math.floor(Date.now() / 1000),
                    })
                }
            }

            state.comments = comments;
        },
        deleteComment(state, id) {
            const comments = [];

            for (let i in state.comments) {
                const comment = state.comments[i];

                const replies = [];
                for (let j in comment.replies) {
                    const reply = comment.replies[j];
                    if (reply.id == id) {
                        continue;
                    }
                    replies.push(reply);
                }

                comment.replies = replies;

                if (comment.id == id) {
                    if (comment.replies.length) {
                        comment.content = 'This comment was deleted by user';
                        comment.date_deleted = Math.floor(Date.now() / 1000);
                    } else {
                        continue;
                    }
                }

                comments.push(comment);
            }

            state.comments = comments;
        },
        updateComment(state, {id, content}) {
            const comments = [];

            for (let i in state.comments) {
                const comment = state.comments[i];

                const replies = [];
                for (let j in comment.replies) {
                    const reply = comment.replies[j];
                    if (reply.id == id) {
                        reply.content = content;
                    }
                    replies.push(reply);
                }

                comment.replies = replies;

                if (comment.id == id) {
                    comment.content = content;
                }

                comments.push(comment);
            }

            state.comments = comments;
        },
        newReply(state, {id, tag}) {
            state.reply = id;
            if (!state.replies[id]) {
                state.replies[id] = '@' + tag + ' ';
            }
        },
        clearReply(state, id) {
            state.reply = '';
            state.replies[id] = '';
        },
        setComments(state, comments) {
            state.comments = comments;
        },
        addComment(state, comment) {
            state.comments.unshift({
                id: comment.id,
                thread_id: "0",
                audio_id: comment.audio_id,
                "user": state.user,
                "time_code": comment.time_code,
                "content": comment.content,
                "date_created": Math.floor(Date.now() / 1000),
                "replies": []
            });
        }
    }
})
