import React, {useEffect, useState} from 'react';
import PropTypes, { element } from 'prop-types';
import { Container, Table, Dropdown, Item, Button } from 'semantic-ui-react';
import { CATEGORIES } from '../../constants';
const Leaderboard = () => {
    const [data, setData] = useState([]);
    const [category, setCategory] = useState('SQL');
    useEffect(() => {
        // Define the function to make the API call
        // Call the function
    const postResults = async () => {
        try {
            console.log(category);
            console.log(`http://localhost:8000/leaderboard/${category}`)
            const response = await fetch(`http://localhost:8000/leaderboard/${category}`, {
                method: 'GET',
                // credentials: 'include', // This is necessary to handle cookies.
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            console.log('Faaaiz');
            const data1 = await response.json();
            setData(data1);
            console.log(data1);
        } catch (error) {
            window.alert('You have not Logged in or Your Seesion has Expired');
            console.error("Error posting results:", error);
        }
    };
        postResults();

    }, [category]);
    return (
        <Container>
                <Dropdown
                  fluid
                  selection
                  name="category"
                  placeholder="Select Quiz Category"
                  header="Select Quiz Category"
                  options={CATEGORIES}
                  value={category}
                  onChange={(e, { value }) => setCategory(value)}
                  
                />
                <br />
        <Table celled striped selectable size="large">
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Username</Table.HeaderCell>
                    <Table.HeaderCell>Points Scored</Table.HeaderCell>
                    <Table.HeaderCell>Points Available</Table.HeaderCell>
                    <Table.HeaderCell>Accuracy</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
            {data.slice(0,10).map((item, i) => (
        <Table.Row key={i}>
            <Table.Cell>{item.Username}</Table.Cell>
            <Table.Cell>{item.Grades[category].total_correct_answer}</Table.Cell>
            <Table.Cell>{item.Grades[category].total_probable_points}</Table.Cell>
            <Table.Cell>{Math.round(item.Grades[category].score*100)}%</Table.Cell>
        </Table.Row>
    ))}
            </Table.Body>
        </Table>
        <Item.Extra>
                <Button
                  primary
                  size="medium"
                  icon="level down alternate"
                  labelPosition="left"
                  content='Login'
                  href='/quiz-app/'
                />
              </Item.Extra>
        </Container>
    );
};


export default Leaderboard;