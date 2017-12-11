const _ = require('lodash')
const axios = require('axios')

const Bithumb = function(){
    if(!(this instanceof Bithumb)) return new Bithumb()

    let ticker
    let timer


    const bithum_ticker_parse = function(data){
        return _.each(data, (d) => d.last = d.closing_price)
    }

    this.get_bithumb_ticker = function(){

        axios.get('https://api.bithumb.com/public/ticker/ALL')
            .then((r) => {
                if(r.status == 200){
                    ticker = bithum_ticker_parse(r.data.data)
                }
            }).catch(err => console.log(err))
    }
    this.run = function(interval){
        if(timer !== undefined){
            console.log("Stop first")
            return
        }
        this.get_bithumb_ticker()
        timer = setInterval(this.get_bithumb_ticker, interval)
    }
    this.stop = function(){
        clearInterval(timer)
        timer = undefined
    }
    this.getTicker = () => ticker
}

module.exports.Bithumb = Bithumb