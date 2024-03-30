import { Models } from "appwrite";
import { Loader } from "lucide-react";
import GridPostList from "./GridPostList";


type SearchResultProps = {
  isSearchFetching: boolean;
  searchPost: Models.Document[]
}

const SearchResults = ({isSearchFetching, searchPost}:SearchResultProps) => {
   
  if(isSearchFetching) return <Loader/>

  if(searchPost && searchPost.documents.length > 0) 
  
  return (
  <GridPostList posts={searchPost.documents}/>
  )
    
  return (
    <p className="text-light-2 mt-10 text-center w-full">
      No results found!
    </p>
  )
}

export default SearchResults
