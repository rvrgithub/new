const Content = require("../models/contentModel");

// create content ....

exports.createContent = async (req, res) => {
  try {
    const content = await Content.create(req.body);
    // console.log("content", content);
    console.log("req.body", req.body);

    return res.status(201).send({
      success: true,
      content: content,
    });
  } catch (err) {
    return res.status(404).send({ message: err.message });
  }
};

// get contents .............
exports.getAllContent = async (req, res) => {
  try {
    const content = await Content.find().lean().exec();
    res.status(201).send({
      success: true,
      content,
    });
    // console.log("content", content);
  } catch (err) {
    await res.status(404).send({ message: "Route is working fine" });
  }
};

// update contents............
exports.updateContent = async (req, res) => {
  try {
    let content = await Content.findById(req.params.id).lean().exec();
    if (!content) {
      return res.status(404).send({
        success: false,
        message: "content not found",
      });
    }
    content = await Content.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    return res.status(201).send({ content: content });
  } catch (err) {
    return res.status(404).send({ message: err.message });
  }
};

// delete contents............
exports.deleteContent = async (req, res) => {
  try {
    let content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).send({
        success: false,
        message: "content not found",
      });
    }
    await content.remove();
    return res
      .status(201)
      .send({ success: true, message: "content delete successfully" });
  } catch (err) {
    return res.status(404).send({ message: err.message });
  }
};


// get content by id .....
exports.getContentById = async (req, res, next) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).send({
        success: false,
        message: "content not find",
      });
    }
    res.status(201).send({ success: true, content });
  } catch (err) {
    return res.status(404).send({ message: err.message });
  }
};