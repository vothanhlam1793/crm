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

export const fragmentCustomer = `
fragment fCustomer on Customer {
    id code phones {id number} name birthday note tags {id title type itemS}
    type address sex
}
`

export const fragmentPhone = `
fragment fPhone on Phone {
    id number users { id name } customers {id code name}
  } 
`

export const fragmentTag = `
fragment fTag on Tag {
	id type title description itemS  
}
`

export const fragmentInvoice = `
fragment fInvoice on Invoice {
    id code createdDate customer {id code} 
    description invoiceDetails purchaseDate 
    total status statusValue
}
`
export const fragmentProduct = `
fragment fProduct on Product {
	id code barCode name fullName description 
    tags { id title itemS type } price minQuantity maxQuantity
}
`