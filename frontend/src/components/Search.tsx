import { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';
import { Thread } from '../types';

interface SearchProps {
  threads: Thread[];
  onSearch: (filteredThreads: Thread[]) => void;
}

const Search = ({ threads, onSearch }: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      const filtered = term 
        ? threads.filter(thread => 
            thread.title.toLowerCase().includes(term.toLowerCase()) ||
            thread.description.toLowerCase().includes(term.toLowerCase())
          )
        : threads;
      onSearch(filtered);
    }, 300),
    [threads, onSearch]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  return (
    <div className='flex items-center gap-2 my-2'>
      <input
        type='text'
        value={searchTerm}
        onChange={handleSearch}
        placeholder='Search a thread'
        className='input input-neutral my-10 w-full border p-6'
      />
      <button 
        className='btn btn-primary p-6'
        onClick={() => debouncedSearch(searchTerm)}
      >
        Search
      </button>
    </div>
  );
};

export default Search;