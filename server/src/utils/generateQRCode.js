const QRCode = require('qrcode')

const generateQR = async text => {
    try {
        return await QRCode.toDataURL(text)
    } catch (err) {
        console.error(err)
    }
}

module.exports = generateQR;