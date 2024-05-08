const embed = (url) => {
    if(url === null) return "https://www.youtube.com/embed/RFAoGY11tUM?si=eDT1iQwvsRqJ9VOh"
    const result = url.split("/")
    return `https://www.youtube.com/embed/${result[3]}`
  }
module.exports = embed