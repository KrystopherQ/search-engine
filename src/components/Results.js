import React, {useState} from 'react';
import { Search } from "./page/SearchBarBot"

function Results() {
  const [currentPage] = useState('Search');

  const renderPage = () => {
    if (currentPage === 'Search') {
      return <Search />;
      }
  }
  return (
    <div>
      <Search />
      {renderPage()}
    </div>
    );
  }

export default Results;
