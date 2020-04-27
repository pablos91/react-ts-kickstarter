import React = require("react");
import global from '../stores/global';

export default React.createContext({
    globalCtx: global,
})
