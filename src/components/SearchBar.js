import React, {Component} from 'react';
import { Icon, Button, Input, AutoComplete } from 'antd';

import nba from '../nba-client';

import { PROFILE_PIC_URL_PREFIX } from "../constants";

const { Option } = AutoComplete;
class SearchBar extends Component {
   state = {
       dataSource: [],
   };


    handleSearch = value => {
        //const players = nba.searchPlayers(value);
        //console.log(players);
        this.setState({
            dataSource: !value ?
                []
                :
                nba.searchPlayers(value).map (player => ({
                    fullName: player.fullName,
                    playerId: player.playerId,
                }))
        });
    };


    onSelect = (value) => {
        console.log(value);
        this.props.handleSelectPlayer(value);
    };

    render() {
        const { dataSource } = this.state;
        const options = dataSource.map(player => (
            <Option key={player.fullName} value={player.fullName} className="player-option">
                <img className="player-option-image"
                     src={`${PROFILE_PIC_URL_PREFIX}/${player.playerId}.png`} />
                 <span className="player-option-label">{player.fullName}
                 </span>
            </Option>
        ));

        return (
            <AutoComplete
                className="search-bar"
                size="large"
                placeholder="Search NBA Player"
                optionLabelProp="value"
                onSearch={this.handleSearch}
                dataSource={options}
                onSelect={this.onSelect}

            >
                <Input suffix={<Icon type="search" className="certain-category-icon" />} />
            </AutoComplete>
        );
    }
}

export default SearchBar;