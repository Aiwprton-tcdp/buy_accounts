import APIService from '../services/APIService.js'

const APIController = {
  getUserBalance: async (req, res) => {
    let balance = await APIService.getUserBalance()
    res.json({ "data": balance })
  },
  getAccountsList: async (req, res) => {
    let { ok, data } = await APIService.getAccountsList()
    res.status(ok ? 200 : 400).json({ "data": data })
  },
  reserveAccount: async (req, res) => {
    let data = await APIService.reserveAccount({
      id: req.query.id,
      price: req.query.price
    })
    res.json({ "data": data })
  },
  checkAccount: async (req, res) => {
    let data = await APIService.checkAccount({
      id: req.query.id
    })
    res.json({ "data": data })
  }
}

export default APIController