export const convertToBase64 = async (file) => {
  const result = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      console.log("called: ", reader);
      resolve(reader.result);
    };
  });

  return result;
};
