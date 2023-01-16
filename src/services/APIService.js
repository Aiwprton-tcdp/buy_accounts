import axios from 'axios';
import {LZTApi} from 'lzt';

// type api_m = {
//   api_base: string;
//   token: string;
//   api: any;
//   getToken: Function;
//   setToken: Function;
//   getData: Function;
// };

const APIService = {
  min_price: 300,
  max_price: 550,
  getUserBalance: async function () {
    let api = new LZTApi({token: process.env.LZT_TOKEN})
    let data = await api.market.getUser()
    return data.user.balance
  },
  getAccountsList: async function () {
    let api = new LZTApi({token: process.env.LZT_TOKEN})
    let result = []

    console.log(`${this.min_price} - ${this.max_price}`)
    const marketSearch = await api.market.search({
        categoryName: 'steam/cs-go-prime',
        pmin: this.min_price,
        pmax: this.max_price,
        category_id: 1,
        page: 1,
        daybreak: 30,
        last_trans_date: 1,
        parse_sticky_items: true,
        account_community_ban: 0
    })

    marketSearch.items.forEach(element => {
      const r = {
        id: element.item_id,
        price: element.price,
        last_transaction: element.steam_last_transaction_date,
        link: element.accountLink,
      }
      result.push(r)
    });

    console.log(`${result.length} accounts`)
    return { "ok": true, "data": result }
  },
  reserveAccount: async function ({id, price}) {
    let api = new LZTApi({token: process.env.LZT_TOKEN})
    let checks = []
    try {
      let d = await api.market.reserve({
        itemId: id,
        price: price
      })
      checks.push(d)
    } catch (error) {
      checks.push(error.message)
    }

    return checks
  },
  checkAccount: async function ({id}) {
    let api = new LZTApi({token: process.env.LZT_TOKEN})
    let checks = []
    try {
      let d = await api.market.checkAccount({
        itemId: id
      })
      checks.push(d)
    } catch (error) {
      checks.push(error.message)
    }

    return checks
  }
}

export default APIService;