export const exerciseOptions = {
    method: 'GET',
    url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
  };

export const youtubeOptions = {
    method: 'GET',
    url: 'https://youtube-search-and-download.p.rapidapi.com',
    headers: {
      'X-RapidAPI-Key': '294f301f13msh7afc844dcec500fp17e526jsn76b30b6020ae',
    }
  };
export const fetchData = async(url, options)=>{
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
}