/* eslint-disable @next/next/no-img-element */

'use client';

import { Flatted } from '@/core/base/entity';
import { IWork } from '@/core/domains/work';
import React from 'react';
import { PersonIcon, GlobeIcon, CalendarIcon } from '@radix-ui/react-icons';
import { Badge } from '@/components/ui/badge';
import { statusParser } from '@/components/SignCard';

import { DashboardForm } from '../DashboardForm';
import { Button } from '@/components/ui/button';

export interface DashboardIssuesProps {
  issue: Flatted<IWork>;
}

const MocketHistory = () => {
  return (
    <ul role="list" className="divide-y divide-gray-100">
      <li className="flex justify-between gap-x-6 py-5">
        <div className="flex min-w-0 gap-x-4">
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">Leslie Alexander</p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
              leslie.alexander@example.com
            </p>
          </div>
        </div>
        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <p className="text-sm leading-6 text-gray-900">Co-Founder / CEO</p>
          <p className="mt-1 text-xs leading-5 text-gray-500">
            Last seen <time dateTime="2023-01-23T13:23Z">3h ago</time>
          </p>
        </div>
      </li>
    </ul>
  );
};

export const DashboardIssue = ({ issue }: DashboardIssuesProps) => {
  const createdAt = new Date(issue.created_at).toLocaleString();

  return (
    <div className="w-full h-full">
      <div className="h-fit rounded-lg w-full justify-between flex p-4 border-slate-100 border-[1px]">
        <div className="flex  items-center gap-4 w-full">
          <div className=" rounded-full h-24 w-24">
            <img className="rounded-full h-full object-cover" alt="placa" src={issue.pictures[0]} />
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-2">
              <GlobeIcon />
              <span className="text-base">{issue.reflector?.props.kilometer_position}</span>{' '}
            </div>
            <h1 className="text-lg font-black">{issue.reflector.props.code}</h1>
            <span className="flex items-center gap-2">
              <PersonIcon />
              <span>{issue.author}</span>
            </span>
            <span className="flex items-center gap-2">
              <CalendarIcon />
              <span>{createdAt}</span>
            </span>
            <Badge className=" min-w-fit " variant={issue.status}>
              {statusParser[issue.status]}
            </Badge>
          </div>
        </div>
        {/* <div className="flex gap-8 items-end">
          <Button className="bg-green-500 hover:bg-green-500/80">Resolvido</Button>
          <Button className="bg-red-500 hover:bg-red-500/80 ">Excluir</Button>
        </div> */}
      </div>
      <div className="flex justify-between gap-4">
        <div className="w-full">
          <DashboardForm issue={issue} />
        </div>
        <div className="w-full hidden">
          <MocketHistory />
        </div>
      </div>
    </div>
  );
};
