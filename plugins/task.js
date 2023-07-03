import gql from 'graphql-tag'
import { fragmentTaskMain } from './fragments';
import { getVariableByKey, createVariable, updateVariable } from './variable';
import { duplicateList } from './todos';
export async function createTaskMain(client, task) {
    /*
        list
        loop
        title
        description
        type
    */
    return new Promise(async (resolve, reject) => {
        client.mutate({
            mutation: gql`
            mutation {
                createTask(data: {
                    type: "${task.type}"
                    title: "${task.title}",
                    description: "${task.description.replace(/\n/g, '\\n').replace(/"/g, '\\"')}",
                    ${task.loop.id ? `loop: {
                        connect: {
                            id: "${task.loop.id}"
                        }
                    },`: ``}
                    ${task.list.id ? `lists: {
                        connect: {
                            id: "${task.list.id}"
                        }
                    },`: ``}
                }) {
                  ...fTaskMain
                }
              }
            ${fragmentTaskMain}
            `
        }).then(data => {
            resolve(data.data.creatTask);
        }).catch(err => {
            reject(err);
        })
    });
}

export async function createTaskNormal(client, task) {
    /*
        list
        loop
        title
        description
        type
        createdBy
        createdAt
        deadline
        status
    */
    return new Promise(async (resolve, reject) => {
        // console.log("CRETA-TASK-NORMAL");
        client.mutate({
            mutation: gql`
            mutation {
                createTask(data: {
                    deadline: "${task.deadline}",
                    createdAt: "${new Date().toISOString()}",
                    status: "TODO",
                    type: "${task.type}",
                    title: "${task.title}",
                    description: "${task.description}",
                    ${task.loop.id ? `loop: {
                        connect: {
                            id: "${task.loop.id}"
                        }
                    },`: ``}
                    ${task.list.id ? `lists: {
                        connect: {
                            id: "${task.list.id}"
                        }
                    },`: ``}
                    estimate: ${task.estimate ? task.estimate : 0},
                }) {
                  ...fTaskMain
                }
              }
            ${fragmentTaskMain}
            `
        }).then(data => {
            // console.log(data);
            resolve(data.data.createTask);
        }).catch(err => {
            reject(err);
        })
    });
}

export async function connectTaskChildToParent(client, idParent, idChild) {
    return new Promise((resolve, reject) => {
        client.mutate({
            mutation: gql`
                        mutation {
            updateTask (id: "${idParent}", data: {
                taskChilds: {
                connect: { id: "${idChild}"}
                }
            }) {
                id
                taskChilds {
                id
                }
            }
            }
            `
        }).then(data => {
            // console.log("SUCCESS - CONECT TASK: ", data);
            resolve(data.data.updateTask);
        }).catch(err => {
            // console.log("ERR - CONECT TASK", err);
            reject(err);
        })
    });
}

export async function allTaskMains(client) {
    return new Promise((resolve, reject) => {
        client.query({
            query: gql`
            query {
                allTasks(where: {
                    type: "TASK_MAIN"
                }){
                    ...fTaskMain
                }
            }
            ${fragmentTaskMain}
            
            `
        }).then(data => {
            // console.log(data);
            resolve(data.data.allTasks);
        }).catch(err => {
            // console.log(err);
            reject(err);
        });
    });
}
// Hàm giúp tìm các ngày trong khoảng thời gian
function getSpecificDaysOfWeek(startDate, endDate, daysOfWeek) {
    var allDaysOfWeek = [];
    var currentDate = new Date(startDate);

    var endDateTime = new Date(endDate).getTime();

    // Lặp qua tất cả các ngày từ startDate đến endDate
    while (currentDate.getTime() <= endDateTime) {
        if (daysOfWeek.includes(currentDate.getDay())) {
            allDaysOfWeek.push(currentDate.toISOString());
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return allDaysOfWeek;
}

function getSpecificDaysOfMonth(startDate, endDate, daysOfMonth) {
    var specificDays = [];
    var currentDate = new Date(startDate);

    while (currentDate <= new Date(endDate)) {
        var currentMonth = currentDate.getMonth() + 1;
        var currentDay = currentDate.getDate();

        if (daysOfMonth.includes(currentDay)) {
            specificDays.push(currentDate.toISOString());
        }

        currentDate.setDate(currentDate.getDate() + 1);

        // Chuyển sang tháng tiếp theo nếu đã hết ngày trong tháng hiện tại
        if (currentDate.getMonth() + 1 > currentMonth) {
            currentDate.setDate(1);
        }
    }

    return specificDays;
}

export async function createTaskMainChild(client, taskMain, endDateCreate) {
    return new Promise((resolve, reject) => {
        if (taskMain.loop) {
            // console.log("TASK_MAIN hợp lệ");
        } else {
            reject("TASKMAIN-NOT-CREATE by Not found LOOP");
            return;
        }
        // Get old date
        var oldDateVariable = {};
        getVariableByKey(client, {
            item: "Task",
            idItem: taskMain.id,
            key: "TO_DATE_CREATED"
        }).then(async oldDate => {
            // console.log("GET-OLD", oldDate);
            if (oldDate.length > 0) {
                // Co ton tai
                oldDateVariable = oldDate[0];
            } else {
                // Khong co ton tai
                oldDateVariable = {
                    item: "Task",
                    idItem: taskMain.id,
                    key: "TO_DATE_CREATED",
                    value: (new Date()).toISOString()
                }
            }
            // console.log("OLD-DATE:", oldDateVariable);
            // NEW DATE - endDateCreate
            // Loop - taskMain
            let deadlines = [];
            let loopData;
            try {
                loopData = JSON.parse(taskMain.loop.data);
            } catch (e) {
                // console.log("Err - pasre", taskMain.loop);
                loopData = [];
            }
            // console.log("DONE-LOOPDATA", taskMain);
            switch (taskMain.loop.type) {
                case "WEEK": {
                    // console.log("WEEK");
                    deadlines = getSpecificDaysOfWeek(oldDateVariable.value, endDateCreate, loopData);
                    // console.log("WEEK: ", deadlines);
                } break;
                case "MONTH": {
                    // console.log("MONTH");
                    deadlines = getSpecificDaysOfMonth(oldDateVariable.value, endDateCreate, loopData);
                    // console.log("MONTH: ", deadlines);
                } break;
                default: {
                    // console.log("Hệ thống chưa hỗ trợ");
                    reject("Hệ thống không hỗ trợ loop-type: ", taskMain.loop.type);
                    return;
                }
            }
            // console.log("DONE DEADLINES", deadlines);
                    // Da xong deadlines
            var tasks = [];
                    for (var j = 0; j < deadlines.length; j++) {
                        // Create task child
                        // Duplicate LIST
                        // console.log("LIST: ", taskMain.lists);
                        let list = await duplicateList(client, taskMain.lists[0].id);
                        // console.log("CREATE-LIST", list);
                        // Create Task Child
                        let taskChild = await createTaskNormal(client, {
                            deadline: deadlines[j],
                            type: "TASK_CHILD",
                            title: taskMain.title.replace(/\n/g, '\\n').replace(/"/g, '\\"'),
                            description: taskMain.description.replace(/\n/g, '\\n').replace(/"/g, '\\"'),
                            estimate: taskMain.estimate ? taskMain.estimate : 0,
                            list: list,
                            loop: {}
                        });
                        // console.log("Create-task-child", taskChild);
                        // Connect TaskMain With Task Child
                        let c = await connectTaskChildToParent(client, taskMain.id, taskChild.id);
                        // console.log("connect", c);
                        tasks.push(taskChild);
                    }

                    // Cap nhat lai gia tri endDateCreate
                    oldDateVariable.value = endDateCreate;
                    // console.log("END-UPDATE: ", oldDateVariable);
                    if(oldDateVariable.id){
                        // Update
                        await updateVariable(client, oldDateVariable);
                    } else {
                        // Create 
                        await createVariable(client, oldDateVariable);
                    }
            resolve(tasks);
        }).catch(err => {
            // console.log("GET-OLD-VARIABLE: ", err);
            reject(err);
        });
    });
}