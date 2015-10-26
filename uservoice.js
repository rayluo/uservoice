// ==UserScript==
// @name         User Voice
// @namespace    https://github.com/
// @version      0.1
// @description  Find out the "User Voice" value of each issue
// @author       Ray Luo
// @include      https://github.com/*/*/issues*
// @grant        none
// ==/UserScript==

var owners = ['jamesls', 'kyleknap', 'mtdowling', 'JordonPhillips', 'rayluo',
             'danielgtaylor', 'garnaat'];  // Plus ex-owners

$("div.issue-comments a.muted-link").each(function(index, item){
    var api = 'https://api.github.com/repos'+$(item).attr('href')+'/comments';
    $.getJSON(api, function(comments, status, xhr){
        var counter = {};
        for (var i = 0; i < comments.length; i++) {
            user = comments[i].user.login;
            if(owners.indexOf(user)==-1) { // exclude owner's comments
                counter[user] = (counter[user] || 0) + 1;
            }
        }
        console.log(counter);
        $(item).append(" (" + Object.keys(counter).length + ")");
    });
});
