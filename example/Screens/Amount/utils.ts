namespace AmountScreenUtils {
  export const appendAmount = (
    currentAmount: string,
    newAmount: string
  ): string => {
    currentAmount = currentAmount.replace(",", "");
    let result: string = "";
    let ch: string[] = new Array(currentAmount.length).fill("");

    if (currentAmount.length > 4) {
      ch = new Array(currentAmount.length + 1).fill("");
      ch[currentAmount.length] = newAmount.charAt(0);
    }

    for (let i = 0; i < currentAmount.length; i++) {
      ch[i] = currentAmount.charAt(i);
    }
    let tmp: string[] = [...ch];
    if (currentAmount.length > 4) {
      tmp[tmp.length - 3] = ch[ch.length - 4];
      tmp[tmp.length - 4] = ch[ch.length - 3];
      ch = tmp;
    } else {
      if (ch[0] === "0" && ch[2] === "0" && ch[3] === "0") {
        ch[3] = newAmount.charAt(0);
      } else if (ch[0] === "0" && ch[2] === "0") {
        tmp[tmp.length - 2] = ch[ch.length - 1];
        tmp[tmp.length - 1] = newAmount.charAt(0);
        ch = tmp;
      } else if (ch[0] === "0") {
        tmp[tmp.length - 4] = ch[ch.length - 2];
        tmp[tmp.length - 2] = ch[tmp.length - 1];
        tmp[tmp.length - 1] = newAmount.charAt(0);
        ch = tmp;
      } else {
        tmp[tmp.length - 1] = newAmount.charAt(0);
        tmp[tmp.length - 4] = ch[ch.length - 2];
        tmp[tmp.length - 3] = ch[ch.length - 3];
        ch = tmp;
      }
    }

    return ch.join("");
  };

  export const deleteCharAmount = (current: string) => {
    current = current.replace(",", "");
    let amount = parseFloat(current);
    amount = amount * 0.1;
    let _final: string = `${amount}`;
    let NewAmount: string = "";

    let ch: string[] = new Array(_final.length).fill("");

    if (amount > 0) {
      for (let i = 0; i < _final.length; i++) {
        if (i > 2 && _final.charAt(i - 3) == ".") {
          break;
        }
        ch[i] = _final.charAt(i);
      }

      for (let c of ch) {
        if (!isNaN(parseFloat(c)) || c == ".") NewAmount = NewAmount + c;
      }
    } else {
      NewAmount = "0.00";
    }

    return NewAmount;
  };
}

export default AmountScreenUtils;
