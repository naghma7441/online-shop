const Category = require('../models/category.model');

const addCategory = async (req, res) => {
  const { name, parentId } = req.body;
  try {
    const category = await new Category({
      name,
      parentId,
    });
    const result = await category.save();
    return res.status(200).json({ statu: 'Success', result });
  } catch (err) {
    return res.status(404).json({ statu: 'fail', err });
  }
};
function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;

  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == null);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  category.forEach((item) => {
    console.log('item', item);
    const myObj = {
      id: item._id,
      name: item.name,
      subCategory: createCategories(categories, item._id),
    };
    categoryList.push(myObj);
  });
  return categoryList;
}

const getCategory = (req, res) => {
  Category.find({}).exec((error, categories) => {
    if (error) return res.status(400).json({ error });
    if (categories) {
      const categoryList = createCategories(categories);
      res.status(200).json({ categoryList });
    }
  });
};

const updateCategory = async (req, res) => {
  const { name, type, parentId } = req.body;
  if (name instanceof Object) {
    console.log(name);
    for (i = 0; i < name.length; i++) {
      const category = {
        name: name[i],
        type: type[i],
      };
      if (parentId !== undefined) {
        category.parentId = parentId[i];
      }

      console.log('category', category);
    }
  } else {
    console.log('hiiioiio');
  }
};
module.exports = {
  addCategory,
  getCategory,
  updateCategory,
};
