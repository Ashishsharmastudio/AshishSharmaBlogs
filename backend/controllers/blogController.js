import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandeler from "../middlewares/error.js";
import ErrorHandler from "../middlewares/error.js";
import { Blog } from "../models/blogSchema.js";
import cloudinary from "cloudinary";

export const blogPost = catchAsyncErrors(async (req, res, next) => {
  // Ensure that at least one file is uploaded
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Blog Main Image Is Mandatory first!", 400));
  }

  // Extract file objects from request
  const { mainImage, paraOneImage, paraTwoImage, paraThreeImage } = req.files;

  // Check if main image is provided
  if (!mainImage) {
    return next(new ErrorHandler("Blog Main Image Is Mandatory second!", 400));
  }

  // Define allowed image formats
  const allowedFormats = ["image/png", "image/jpeg", "image/webp", "image/jpg"];

  // Check if uploaded images are of allowed formats
  if (
    !allowedFormats.includes(mainImage.mimetype) ||
    (paraOneImage && !allowedFormats.includes(paraOneImage.mimetype)) ||
    (paraTwoImage && !allowedFormats.includes(paraTwoImage.mimetype)) ||
    (paraThreeImage && !allowedFormats.includes(paraThreeImage.mimetype))
  ) {
    return next(
      new ErrorHandler(
        "Invalid file type. Only JPG, PNG and WEBP Formats Are Allowed!",
        400
      )
    );
  }

  // Extract required fields from request body
  const {
    title,
    intro,
    paraOneDescription,
    paraOneTitle,
    paraTwoDescription,
    paraTwoTitle,
    paraThreeDescription,
    paraThreeTitle,
    category,
    published,
  } = req.body;

  // Ensure required fields are provided
  if (!title || !category || !intro) {
    return next(
      new ErrorHandler("Title, Intro, and Category Are Required Fields!", 400)
    );
  }

  // // Define and initialize the published variable from the request body
  // const { published } = req.body;

  // // Check if published is provided in the request body
  // if (published === undefined || published === null) {
  //   // If not provided, set a default value
  //   const published = true; // Set a default value, such as true or false
  // }

  // Extract user information from request
  const createdBy = req.user._id;
  const authorName = req.user.name;
  const authorAvatar = req.user.avatar.url;

  // Upload images to Cloudinary
  const uploadPromises = [
    cloudinary.uploader.upload(mainImage.tempFilePath),
    paraOneImage
      ? cloudinary.uploader.upload(paraOneImage.tempFilePath)
      : Promise.resolve(null),
    paraTwoImage
      ? cloudinary.uploader.upload(paraTwoImage.tempFilePath)
      : Promise.resolve(null),
    paraThreeImage
      ? cloudinary.uploader.upload(paraThreeImage.tempFilePath)
      : Promise.resolve(null),
  ];

  // Wait for all image uploads to complete
  const [mainImageRes, paraOneImageRes, paraTwoImageRes, paraThreeImageRes] =
    await Promise.all(uploadPromises);

  // Check for errors during image uploads
  if (
    !mainImageRes ||
    mainImageRes.error ||
    (paraOneImage && (!paraOneImageRes || paraOneImageRes.error)) ||
    (paraTwoImage && (!paraTwoImageRes || paraTwoImageRes.error)) ||
    (paraThreeImage && (!paraThreeImageRes || paraThreeImageRes.error))
  ) {
    return next(
      new ErrorHandler("Error occurred while uploading one or more images!", 500)
    );
  }

  // Construct blog data object
  const blogData = {
    title,
    intro,
    paraOneDescription,
    paraOneTitle,
    paraTwoDescription,
    paraTwoTitle,
    paraThreeDescription,
    paraThreeTitle,
    category,
    createdBy,
    authorAvatar,
    authorName,
    published, // Include published variable
    mainImage: {
      public_id: mainImageRes.public_id,
      url: mainImageRes.secure_url,
    },
  };

  // Include additional images in blog data if available
  if (paraOneImageRes) {
    blogData.paraOneImage = {
      public_id: paraOneImageRes.public_id,
      url: paraOneImageRes.secure_url,
    };
  }
  if (paraTwoImageRes) {
    blogData.paraTwoImage = {
      public_id: paraTwoImageRes.public_id,
      url: paraTwoImageRes.secure_url,
    };
  }
  if (paraThreeImageRes) {
    blogData.paraThreeImage = {
      public_id: paraThreeImageRes.public_id,
      url: paraThreeImageRes.secure_url,
    };
  }

  // Create blog entry in database
  const blog = await Blog.create(blogData);

  // Send success response
  res.status(200).json({
    success: true,
    message: "Blog uploaded successfully",
    blog,
  });
});

//deleteBlog

export const deleteBlog =catchAsyncErrors(async(req, res, next) => {
 const { id } = req.params;
 const  blog = await Blog.findById(id);
 if (!blog) {
  return next(new ErrorHandeler("Blog not found!", 404));
 }
 await Blog.deleteOne();
 res.status(200).json({
  success: true,
  message: "Blog deleted successfully!",
 });
}); 

//getAllBlog
export const getAllBlogs = catchAsyncErrors(async (req, res, next) => {
  const allBlogs = await Blog.find({published: true});
  res.status(200).json({
    sucess: true,
    allBlogs,
  });
});

//getSingleBlog

export const getSingleBlog = catchAsyncErrors(async (req, res, next) => {
  const {id} = req.params;
  const blog = await Blog.findById(id);
  if(!blog){
    return next(new ErrorHandeler("blog not found!, 404"))
  }
  res.status(200).json({
    sucess: true,
    blog
  });
});

//getMyBlog

export const getMyBlog = catchAsyncErrors(async (req, res, next) => {
  const createdBy = req.user._id;
  const blogs = await Blog.find({ createdBy });
  res.status(200).json({
    sucess: true,
    blogs,
  });
});

// updateBlog

export const updateBlog = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let blog = await Blog.findById(id);
  if (!blog) {
    return next(new ErrorHandler("Blog not found!", 404));
  }
  const newBlogData = {
    title: req.body.title,
    intro: req.body.intro,
    category: req.body.category,
    paraOneTitle: req.body.paraOneTitle,
    paraOneDescription: req.body.paraOneDescription,
    paraTwoTitle: req.body.paraTwoTitle,
    paraTwoDescription: req.body.paraTwoDescription,
    paraThreeTitle: req.body.paraThreeTitle,
    paraThreeDescription: req.body.paraThreeDescription,
    published: req.body.published,
  };
  if (req.files) {
    const { mainImage, paraOneImage, paraTwoImage, paraThreeImage } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (
      (mainImage && !allowedFormats.includes(mainImage.mimetype)) ||
      (paraOneImage && !allowedFormats.includes(paraOneImage.mimetype)) ||
      (paraTwoImage && !allowedFormats.includes(paraTwoImage.mimetype)) ||
      (paraThreeImage && !allowedFormats.includes(paraThreeImage.mimetype))
    ) {
      return next(
        new ErrorHandler(
          "Invalid file format. Only PNG, JPG and WEBp formats are allowed.",
          400
        )
      );
    }
    if (req.files && mainImage) {
      const blogMainImageId = blog.mainImage.public_id;
      await cloudinary.uploader.destroy(blogMainImageId);
      const newBlogMainImage = await cloudinary.uploader.upload(
        mainImage.tempFilePath
      );
      newBlogData.mainImage = {
        public_id: newBlogMainImage.public_id,
        url: newBlogMainImage.secure_url,
      };
    }

    if (req.files && paraOneImage) {
      if (blog.paraOneImage && blog.paraOneImage.public_id) {
        const blogParaOneImageId = blog.paraOneImage.public_id;
        await cloudinary.uploader.destroy(blogParaOneImageId);
      }
      const newBlogParaOneImage = await cloudinary.uploader.upload(
        paraOneImage.tempFilePath
      );
      newBlogData.paraOneImage = {
        public_id: newBlogParaOneImage.public_id,
        url: newBlogParaOneImage.secure_url,
      };
    }
    if (req.files && paraTwoImage) {
      if (blog.paraTwoImage && blog.paraTwoImage.public_id) {
        const blogParaTwoImageId = blog.paraTwoImage.public_id;
        await cloudinary.uploader.destroy(blogParaTwoImageId);
      }
      const newBlogParaTwoImage = await cloudinary.uploader.upload(
        paraTwoImage.tempFilePath
      );
      newBlogData.paraTwoImage = {
        public_id: newBlogParaTwoImage.public_id,
        url: newBlogParaTwoImage.secure_url,
      };
    }
    if (req.files && paraThreeImage) {
      if (blog.paraThreeImage && blog.paraThreeImage.public_id) {
        const blogParaThreeImageId = blog.paraThreeImage.public_id;
        await cloudinary.uploader.destroy(blogParaThreeImageId);
      }
      const newBlogParaThreeImage = await cloudinary.uploader.upload(
        paraThreeImage.tempFilePath
      );
      newBlogData.paraThreeImage = {
        public_id: newBlogParaThreeImage.public_id,
        url: newBlogParaThreeImage.secure_url,
      };
    }
  }
  blog = await Blog.findByIdAndUpdate(id, newBlogData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Blog Updated!",
    blog,
  });
});

