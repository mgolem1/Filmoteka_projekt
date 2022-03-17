const info = (...filmovi) => {
    if(process.env.NODE_ENV !== "test")
    {console.log(...filmovi);}
  }
  
  const greska = (...filmovi) => {
    console.error(...filmovi);
  }
  
  module.exports = {info, greska}