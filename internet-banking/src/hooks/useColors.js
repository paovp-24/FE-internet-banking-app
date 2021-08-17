export const useColors = () => {
    const getColors = (labels) => {
      let colors = [];
      for (let i = 0; i < labels.length; i++) {
        colors.push(random_rgba());
      }
      return colors;
    };
  
    const random_rgba = () => {
      var o = Math.round,
        r = Math.random,
        s = 255;
      const randomCC = o(r() * s);
      //return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
  
      if (randomCC > 50) {
        return "rgba(" + randomCC + ",255,255,0.7)";
      } else {
        return random_rgba();
      }
    };

    return { getColors }
  };
  