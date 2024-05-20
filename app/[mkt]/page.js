"use client"

import {socket} from "@/app/socket";
import React, { useState, useEffect } from 'react';
import {Table, Image} from 'antd';
import { uniqBy } from 'lodash'

export default function Home({params}) {
  const [dataSource, setDataSource] = useState([]);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [socketInstance] = useState(socket());
  const inputMktCap = params?.mkt

  useEffect(() => {
    socketInstance.on('tradeCreated', (response) => {
      const mintId = response?.mint;

      const existingCoinIndex = dataSource.findIndex(
        (coin) => coin.mint === mintId
      );

      if (response.usd_market_cap >= Number(inputMktCap)) {
        if (existingCoinIndex !== -1) {
          // Update existing coin if market cap exceeds threshold
          setDataSource((prevData) =>
            prevData.map((coin, index) =>
              index === existingCoinIndex ? { ...coin, ...response } : coin
            )
          );
        } else {
          // Add new coin if market cap exceeds threshold and not present
          setDataSource((prevState) => [{ ...response }, ...prevState ]);
        }
      }
    });
  }, []);

  useEffect(() => {
    const filtered = uniqBy(dataSource, (coin) => coin.mint);
    setFilteredDataSource(filtered);
  }, [dataSource])

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image_uri',
      render: (imageUri) => <Image width={50} src={imageUri} />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
    },
    {
      title: 'Market Cap (USD)',
      dataIndex: 'usd_market_cap',
      key: 'usd_market_cap',
      render: (marketCap) => parseFloat(marketCap).toFixed(2).toLocaleString(),
    },
    {
      title: 'Pump Fun URL',
      dataIndex: 'mint',
      key: 'mint',
      render: (mint) => (
        <a href={`https://pump.fun/${mint}`} target="_blank" rel="noreferrer noopener">
          {`https://pump.fun/${mint}`}
        </a>
      ),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <div style={{width: '80%', margin: '0 auto'}}>
        <Table size="small" dataSource={filteredDataSource} columns={columns} />
      </div>
    </div>
  );
}

