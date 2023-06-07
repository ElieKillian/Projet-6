module.exports = (req, res, next) => {
	try{
		const host = req.get('host');
		const title = req.body.title.trim() ?? undefined;
		console.log("title");
		
		const categoryId = parseInt(req.body.category) ?? undefined;
		console.log("category");

		const userId = req.auth.userId ?? undefined;
		console.log("user");

		const imageUrl = `${req.protocol}://${host}/images/${req.file.filename}` ?? undefined;
		console.log("image");

	console.log(title,categoryId,userId,imageUrl)
		if(title !== undefined &&
			title.length > 0 &&
			categoryId !== undefined &&
			categoryId > 0 &&
			userId !== undefined &&
			userId > 0 &&
			imageUrl !== undefined){
			req.work = {title, categoryId, userId, imageUrl}
			next()
		}else{
			return res.status(400).json({error: new Error("Bad Request")})
		}
	}catch(e){
		return res.status(500).json({error: new Error("Something wrong occured")})
	}

}
