"use client"

import {socket} from "@/app/socket";
import React, { useState, useEffect } from 'react';
import {Table, Image} from 'antd';
import { uniqBy } from 'lodash'

export default function Home({params}) {
  return (
    <div style={{ padding: '20px' }}>
      <div style={{width: '80%', margin: '0 auto'}}>
        <a href="https://pump-fun-three.vercel.app/55000" rel="noreferrer noopener">
          Clique aqui
        </a>
      </div>
    </div>
  );
}

