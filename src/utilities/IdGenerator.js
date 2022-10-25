
export const idGenerator = () => {
  const RegExp = /[a-zA-Z0-9]/;
  let source = [];
  let id = '';
  
  // Create chars set.
  for (let i = 48; i <= 122; i++) {
    if (String.fromCharCode(i).match(RegExp)) {
      source.push(String.fromCharCode(i));
    };
  };
  
  // Generate random ID.
  for (let i = 0; i < 6; i++) {
    id += source[Math.floor(Math.random() * source.length)];
  };

  return id;
};