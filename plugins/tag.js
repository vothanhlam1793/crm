import gql from 'graphql-tag'
import { fragmentTag } from './fragments';

export default function(context, inject){ 
    function createTag(tag){
        return new Promise((resolve, reject) => {
            var client = context.app.apolloProvider.defaultClient;
            client.mutate({
                mutation: gql`
                mutation {
                    createTag(data:{
                        title: "${tag.title ? tag.title : ''}",
                        type: "${tag.type ? tag.type : ''}",
                        itemS: "${tag.itemS ? tag.itemS : ''}",
                        description: "${tag.description ? tag.description : ''}"
                    }) {
                        ...fTag
                    }
                }
                ${fragmentTag}
                `
            }).then(data => {
                resolve(data.data.createTag);
            }).catch(err => {
                reject(err);
            });
        });
    }

    function getTags(tag){
        return new Promise((resolve, reject) => {
            var client = context.app.apolloProvider.defaultClient;
            client.query({
                query: gql`
                query {
                    allTags(where: {
                        ${tag.title ? 'title: "' + tag.title + '",' : ''}
                        ${tag.type ? 'type: "' + tag.type + '",' : ''}
                        ${tag.itemS ? 'itemS: "' + tag.itemS + '",' : ''}
                    }) {
                        ...fTag
                    }
                }
                ${fragmentTag}
                `
            }).then(data => {
                resolve(data.data.allTags);
            }).catch(err => {
                reject(err);
            })
        });
    }

    function getArrayTag(tags, itemS){
        // tags = ['LAM', 'TRANG', 'DINH']
        return new Promise((resolve, reject) => {
            if(tags.length == 0){
                resolve([]);
            }
            var client = context.app.apolloProvider.defaultClient;
            var str  = '[';
            tags.forEach(function(tag, index){
                if(index !== 0){
                    str += ',';
                }
                str += `{title: "${tag}"}`
            });
            str += ']';
            client.query({
                query: gql`
                query {
                    allTags(where: {
                        OR: ${str},
                        itemS: "${itemS}"
                        }) {
                        ...fTag
                        }
                    }
                ${fragmentTag}
                `
            }).then(data => {
                resolve(data.data.allTags);
            }).catch (err => {
                reject(err);
            })
        });
    }
    inject("getArrayTag", getArrayTag);
    inject("createTag", createTag);
    inject("getTags", getTags);
}