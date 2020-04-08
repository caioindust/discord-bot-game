const fetch = require('node-fetch');

function checkStatus(res) {
    if (res.ok) { // res.status >= 200 && res.status < 300
      return res;
    } else {
      throw res.statusText;
    }
  }
  
  function checkApiError(json) {
    if (json.characters.error) {
      console.log(json);
      throw json.characters.error;
    } else {
      return json;
    }
  }

module.exports = {
    name: "tibia",
    category: "fun",
    description: "Character data from the game tibia",
    usage: "!!tibia -c --name ''",
    run: async (client, message, args) => {
        const name = args.name || args.n;
        if (args.level || args.l) {            
            fetch(`https://api.tibiadata.com/v2/characters/${name}.json`)
                .then(checkStatus)
                .then(res => res.json())
                .then(checkApiError)
                .then(json => {

                    return json.characters.data;
                })
                .then(data => message.channel.send(`${data.name} está no level ${data.level}`))
                .catch(err => message.channel.send(err));

            return;
        }

        if (args.character || args.c || args.char) {
            fetch(`https://api.tibiadata.com/v2/characters/${name}.json`)
                .then(checkStatus)
                .then(res => res.json())
                .then(checkApiError)
                .then(json => {
                    console.log(json);
                    return json.characters.data;
                })
                .then(data => message.channel.send(JSON.stringify(data)))
                .catch(err => message.channel.send(err));

            return;
        }
    }
};
