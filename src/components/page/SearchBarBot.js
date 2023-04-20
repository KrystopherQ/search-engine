import {useState} from "react";
import {Input, Button} from "daisyui";
import axios from "axios";
import {load} from "cheerio";

 function Search () {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.get(`https://www.google.com/search?q=${query}`);
    const $ = load(response.data);

    const links = $("a");
    const domains = [];

    links.each((i, link) => {
      const href = $(link).attr("href");
      if (href.startsWith("/url?q=")) {
        const url = href.substring(7).split("&")[0];
        const domain = new URL(url).hostname;
        if (domain.endsWith(".com")) {
          domains.push(domain);
        }
      }
    });

    setResults(domains);
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center space-x-2">
        <Input type="text" placeholder="Search" value={query} onChange={handleChange} className="input input-bordered w-full lg:w-11/12"/>
        <Button className="btn btn-success" type="submit">Search</Button>
      </div>
      <div className="mt-4">
        {results.map((result, i) => (
          <div key={i}>{result}</div>
        ))}
      </div>
    </form>
  );
}

export {Search};
