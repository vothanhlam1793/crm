export const fragmentTodo = `
fragment fTodo on Todo {
    id
    content
    flag 
    done
}
`
export const fragmentListMain = `
fragment fListMain on List {
    id 
    todos {
        ...fTodo
    } 
    title 
    description 
    users {id name}
}
${fragmentTodo}
`
export const fragmentLoop = `
fragment fLoop on Loop {
    id endDate type data
}
`
export const fragmentTaskChild = `
fragment fTaskChild on Task {
    id
    title
    description
    estimate
    loop { ...fLoop }
    lists { ...fListMain }
}
`
export const fragmentTaskMain = `
fragment fTaskMain on Task {
    id
    title
    description
    estimate
    loop { ...fLoop }
    lists { ...fListMain }
    taskChilds { ...fTaskChild }

}
${fragmentListMain}
${fragmentLoop}
${fragmentTaskChild}
`

export const fragmentVariable = `
fragment fVariable on Variable {
	id key value item idItem slug
}
`