//防抖
export const Debounce = (fn, t) => {
  let delay = t || 5000
  let timer
  let i = 0
  return function() {
    if (i++ >= 5) {
      uni.showToast({
        icon: 'none',
        title: "操作频繁，请5秒后重试"
      })
      i = 0
    }
    let args = arguments;
    if (timer) {
      clearTimeout(timer)
    }
    let callNow = !timer
    timer = setTimeout(() => {
      i = 0
      timer = null
    }, delay)

    if (callNow) fn.apply(this, args)
  }
}

/** 
   //身份证算法校验
   @param{Number | String} id_no 身份证号码
   @returns 返回校验结果
*/
export function CheckIdCard(id_no) {
  let c = 0;
  let p = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  for (let i = 0; i < 17; i++) {
    let n = id_no.substr(i, 1);
    n = parseInt(n);
    c += p[i] * n;
  }
  let y = c % 11;
  let r = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];
  let v = r[y];
  if (v == 10)
    v = 'x';
  let l = id_no.substr(17, 1);

  if (v != l.toLowerCase()) {
    return false
  } else {
    return true
  }

}