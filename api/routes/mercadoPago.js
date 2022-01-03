const router = require("express").Router();
const mercadopago = require("mercadopago");
const dontenv = require("dotenv");
dontenv.config();

mercadopago.configure({
    access_token: process.env.MP_KEY
});

router.post("/payment", async (req, res)=> {
    let preference = {
		items: [
			{
				// id: req.body.id,
				// title: req.body.title,
				// unit_price: 100,
				// quantity: 1,
				title: req.body.title,
				unit_price: req.body.unit_price,
				quantity: req.body.quantity,
			}
		],
		// back_urls: { // payments status and redirect
		// 	"success": "http://localhost:3000",
		// 	"failure": "http://localhost:3000/feedback",
		// 	"pending": "http://localhost:3000/feedback"
		// },
		// auto_return: "approved",
	};

	// mercadopago.preferences.create(preference)
	// 	.then(function (response) {
	// 		res.json({
	// 			id: response.body.id
	// 		});
	// 	}).catch(function (error) {
	// 		console.log(error);
	// 	});
	try {
		const create = await mercadopago.preferences.create(preference)
		res.status(200).json(create);
	  } catch (error) {
		res.status(500).json(error);
	  }
});




module.exports = router;
