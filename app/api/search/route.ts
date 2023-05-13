import { NextResponse } from "next/server";
import axios from 'axios';
import { MovieDetails } from "@/utils/types";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const term = searchParams.get("term");
  const page = searchParams.get("page");

  const options = {
    method: 'GET',
    url: 'https://movie-database-alternative.p.rapidapi.com/',
    params: {
      s: term,
      r: 'json',
      page: page,
      type: "movie"
    },
    headers: {
      'X-RapidAPI-Key': "d31283acfcmsh840a8bd999fdd8cp16abd5jsn09bb957d6648",
      'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
    }
  };

  const individualOptions = (id: string) => {
    return {
      method: 'GET',
      url: 'https://movie-database-alternative.p.rapidapi.com/',
      params: {
        i: id,
        r: 'json',
      },
      headers: {
        'X-RapidAPI-Key':  "d31283acfcmsh840a8bd999fdd8cp16abd5jsn09bb957d6648",
        'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
      }
    }
  };
  
  try {
    const response = await axios.request(options);
    const data = response.data.Search
    const returnData : MovieDetails[] = []
    for (const dat of data) {
      const detailedResponse = await axios.request(individualOptions(dat.imdbID));
      returnData.push(detailedResponse.data)
    }
    return NextResponse.json({returnData, ...response.data});
  } catch (error) {
    return NextResponse.error()
  }
}

