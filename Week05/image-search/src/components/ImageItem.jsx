//image.user.name gets the photographer's name from Unsplash.

//image.user.links.html gets their profile link.

const ImageItem = (props) => {
  const { image } = props;

  //target="_blank" opens their profile in a new tab.
  //<figcaption> displays the credit underneath the image.
  return (
    <figure className="mb-6 max-w-md">
      <img
        src={image.urls.small}
        alt={image.alt_description || "Unsplash photo"}
        className="w-full h-auto"
      />

      <figcaption className="mt-2 text-sm text-gray-600">
        Photo by{" "}
        <a
          href={image.user.links.html}
          target="_blank"
          rel="noreferrer"
          className="text-blue-700 underline"
        >
          {image.user.name}
        </a>
      </figcaption>
    </figure>
  );
};

export default ImageItem;
