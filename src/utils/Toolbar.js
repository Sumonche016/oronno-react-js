import { emoji } from "./emoji";


export const toolbar = {
    options: ['inline', 'blockType', 'list', 'textAlign', 'history'],
    inline: {
        options: ['bold', 'italic', 'underline'],
    },
    blockType: {
        options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
    },



    list: {
        options: ['unordered', 'ordered'],
    },
    textAlign: {
        options: ['left', 'center', 'right', 'justify'],
    },


    history: {
        options: ['undo', 'redo'],
    },
};