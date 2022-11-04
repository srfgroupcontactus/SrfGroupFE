import * as React from "react";
import debounce from "lodash/debounce";
import axios from 'axios'

export default function  SuggesSearch(){

    const [query, setQuery] = React.useState('');
    const [searchQuery, setSearchQuery] = React.useState({});

    const onChangeInput = (event: any) => {
        console.log('event.target.value ', event.target.value);
        setQuery(event.target.value);

        const search = debounce(sendQuery, 500);

        setSearchQuery((prevSearch: any) => {
            if (prevSearch.cancel) {
                prevSearch.cancel();
            }
            return search;
        });

        search(event.target.value);
    };


    const sendQuery = (value: string) => {
        console.log('onSuggestionsFetchRequested ', value);
        axios.post('http://localhost:9200/suggest_search/_search', {
            "query": {
                "multi_match": {
                    "query": value,
                    "fields": ["name", "description"],
                    "fuzziness": 2
                }
            }
        })
        .then(result => {
            console.log('suggestions ', result);
            const results = result.data.hits.hits.map((h: any) => h._source)
            console.log('suggestions results', results);
            if( results?.length ){
                // this.setState({ suggestions: results })
            }

        })
    }

    return (
        <div>
            <input type="search" onChange={onChangeInput}/>
            {/*{*/}
            {/*    this.state.suggestions.map((item: any, index: number) => (*/}
            {/*        <p key={index}>{item?.name}</p>*/}
            {/*    ))*/}
            {/*}*/}
        </div>
    );
    /*
    state = {
        value: '',
        suggestions: []
    }

    componentDidUpdate() {
        console.log('componentDidMount');
        this.onSuggestionsFetchRequested();
    }

    onSuggestionsFetchRequested = () => {
        console.log('onSuggestionsFetchRequested ', this.state.value);
        axios.post('http://localhost:9200/suggest_search/_search', {
                "query": {
                    "multi_match": {
                        "query": this.state.value,
                        "fields": ["name", "description"],
                        "fuzziness": 2
                    }
                }
            })
            .then(result => {
                console.log('suggestions ', result);
                const results = result.data.hits.hits.map((h: any) => h._source)
                console.log('suggestions results', results);
                if( results?.length ){
                    this.setState({ suggestions: results })
                }

            })
    }

    onSuggestionsClearRequested = () => {
        this.setState({ suggestions: [] })
    }

    onChangeInput = (event: any) => {
        console.log('event ', event.target.value);
        this.setState({ value: event.target.value })
    }


    render() {
        return (
            <div>
                <input type="search" onChange={this.onChangeInput}/>
                {
                    this.state.suggestions.map((item: any, index: number) => (
                        <p key={index}>{item?.name}</p>
                    ))
                }
            </div>
        );
    }
    */
}
