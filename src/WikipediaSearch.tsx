import React, { useState } from 'react'
import { Text, Stack, TextField, DefaultButton } from 'office-ui-fabric-react'

const WikipediaSearch: React.FC = () => {
	const [ query, setQuery ] = useState("")
	const [ results, setResults ] = useState<any[]>([])

	var searchWiki = async () => {
		if(query.length <= 3) {
			setResults(["ERROR: Please enter a longer search term(at least 4 characters)!"]);
		}
		else {
			var wikiURL =	"https://de.wikipedia.org/w/api.php?action=opensearch&search="
							+ query +
							"&limit=10&format=json&origin=*";
			var response = await fetch(wikiURL);
			var data = await response.json();

			setResults(formatData(data));
		}
	};

	var formatData = (data: [][]) => {
		var reformattedData = [];
		
		for(var i = 0; i < data[1].length; i++){
			reformattedData.push(
				<div style={{paddingBottom: "25px"}}>
					<a	target="_blank" rel="noopener noreferrer" 
						href={data[3][i]}
					>
						{data[1][i]+":"}
					</a>
					<br />
						{data[2][i]}
				</div>
			);
		}

		return reformattedData;
	};

	return (
		<Stack horizontalAlign="center" tokens={{ childrenGap: '1rem' }}>
			<Stack.Item>
				<Text variant={'xxLargePlus'}>Wikipedia Search</Text>
			</Stack.Item>
			<Stack.Item>
				<Stack horizontal tokens={{ childrenGap: '0.5rem' }}>
					<Stack.Item>
						<TextField	onKeyPress={(event) => { if(event.key === "Enter") searchWiki() }}
									onChange={(event, newValue) =>{ if(newValue != null)setQuery(newValue) }}
									value={query}/>
					</Stack.Item>
					<Stack.Item>
						<DefaultButton text="Search" type="submit" onClick={searchWiki} />
					</Stack.Item>
				</Stack>
			</Stack.Item>
			<Stack.Item>
				<div style={{paddingBottom: "50px"}}>
					<Text variant={'large'}>Search results:</Text>
				</div>
				<div>
					{results}
				</div>
			</Stack.Item>
		</Stack>
	)
}

export default WikipediaSearch