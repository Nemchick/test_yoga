export const luscherColorMap = {
  0: '#A39D91',
  1: '#293155',
  2: '#006E6A',
  3: '#DC401B',
  4: '#ECCB0A',
  5: '#B60659',
  6: '#9E4A26',
  7: '#242527',
}

export const declOfNum = (number, titles) => {
  let cases = [2, 0, 1, 1, 1, 2]
  return titles[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ]
}

export const getDate = (str) => {
  const date = new Date(str)
  return date.getDate()
}

export const cloudPaymentsPay = (options) => {
  const callbacks = {
    onSuccess: () => {
      location.reload()
    },
  }
  /*eslint no-undef: 0*/
  let widget = new cp.CloudPayments()
  widget.pay('charge', options, callbacks)
}
