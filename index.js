const io = require('socket.io')(8000,{cors: {origin:"*"}});

let totalVotes = 0;
let votingPolls = {
    'html': 0,
    'css': 0,
    'javascript': 0,
    'react': 0,
    'python': 0,
}

io.on('connection',socket => {

    //SEND CURRENT DATA OF VOTES TO USER WHEN VISITED THE SITE
    socket.emit('update',{votingPolls,totalVotes})

    socket.on('send-vote',voteTo =>{
        totalVotes += 1;
        console.log(voteTo);
        votingPolls[voteTo] += 1;
        socket.broadcast.emit('receive-vote',{votingPolls,totalVotes});
        socket.emit('update',{votingPolls,totalVotes})
    })
})