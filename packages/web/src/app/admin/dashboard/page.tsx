'use client'

import {Fragment, useState} from 'react'
import {Dialog, DialogPanel} from '@headlessui/react'
import {Bars3Icon,} from '@heroicons/react/20/solid'
import {PowerIcon, XMarkIcon} from '@heroicons/react/24/outline'
import Logo from "@sose2025/web/public/logo.webp";
import Image from "next/image";
import Link from "next/link";

const navigation = [
    {name: 'Dashboard', href: '#'},
    {name: 'Bestellungen', href: '#'},
    {name: 'Produkte', href: '#'},
]
const timePeriods: { label: string; value: number }[] = [
    {label: 'Letzte 7 Tage', value: 7},
    {label: 'Letzte 30 Tage', value: 30},
    {label: 'Gesamter Zeitraum', value: 0},
];
const stats = [
    {name: 'Produkte', value: '69 Produkte', change: '+54.02%', changeType: 'positive'},
    {name: 'Bestellungen', value: '28 Bestellungen', change: '-20.02%', changeType: 'negative'},
    {name: 'Kunden', value: '20 Kunden', change: '+54.02%', changeType: 'positive'},
    {name: 'Umsatz', value: '245,98 €', change: '-1.39%', changeType: 'negative'},
]

const statuses: Record<string, string> = {
    Captured: 'text-green-700 bg-green-50 ring-green-600/20',
    Bezahlt: 'text-gray-600 bg-gray-50 ring-gray-500/10',
    Offen: 'text-red-700 bg-red-50 ring-red-600/10',
}
const days = [
    {
        date: 'Heute',
        dateTime: '2023-03-22',
        transactions: [
            {
                id: 1,
                orderNumber: '00012',
                amount: '20,99 €',
                status: 'Captured',
                customer: 'Max Mustermann',
                itemCount: 3,
            },
            {
                id: 2,
                orderNumber: '00011',
                amount: '15,99 €',
                status: 'Bezahlt',
                customer: 'Tom Cook',
                itemCount: 2,
            },
            {
                id: 3,
                orderNumber: '00009',
                amount: '7,99 €',
                status: 'Offen',
                customer: 'Reform Corp.',
                itemCount: 1,
            },
        ],
    },
    {
        date: 'Gestern',
        dateTime: '2023-03-21',
        transactions: [
            {
                id: 4,
                orderNumber: '00010',
                amount: '12,99 €',
                status: 'Captured',
                customer: 'Jane Doe',
                itemCount: 5,
            },
        ],
    },
]

const clients = [
    {
        id: 1,
        name: 'Max Mustermann',
        imageUrl: 'https://api.dicebear.com/9.x/pixel-art-neutral/png?seed=Max%20Mustermann',
        lastOrder: {date: '13. Juni 2025', dateTime: '2025-06-13', amount: '20,99 €', status: 'Captured'},
    },
    {
        id: 2,
        name: 'Tom Cook',
        imageUrl: 'https://api.dicebear.com/9.x/pixel-art-neutral/png?seed=Tom%20Cook',
        lastOrder: {date: 'February 15, 2025', dateTime: '2025-02-15', amount: '15,99 €', status: 'Captured'}
    },
    {
        id: 3,
        name: 'Reform Corp.',
        imageUrl: 'https://api.dicebear.com/9.x/pixel-art-neutral/png?seed=Reform%20Corp',
        lastOrder: {date: 'March 10, 2025', dateTime: '2025-03-10', amount: '7,99 €', status: 'Offen'},
    },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Example() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [cashflowDays, setCashflowDays] = useState(7);

    return (
        <>
            <header className="absolute inset-x-0 top-0 z-50 flex h-16 border-b border-gray-900/10">
                <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-1 items-center gap-x-6">
                        <button type="button" onClick={() => setMobileMenuOpen(true)} className="-m-3 p-3 md:hidden">
                            <span className="sr-only">Menü öffnen</span>
                            <Bars3Icon aria-hidden="true" className="size-5 text-gray-900"/>
                        </button>
                        <Image
                            alt="Logo"
                            src={Logo}
                            className="h-8 w-auto"
                        />
                        <span className="sr-only">Rubber Ducking</span>
                    </div>
                    <nav className="hidden md:flex md:gap-x-11 md:text-sm/6 md:font-semibold md:text-gray-700">
                        {navigation.map((item, itemIdx) => (
                            <a key={itemIdx} href={item.href}>
                                {item.name}
                            </a>
                        ))}
                    </nav>
                    <div className="flex flex-1 items-center justify-end gap-x-8">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Abmelden</span>
                            <PowerIcon aria-hidden="true" className="size-6 text-gray-900"/>
                        </a>
                    </div>
                </div>
                <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                    <div className="fixed inset-0 z-50"/>
                    <DialogPanel
                        className="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-white px-4 pb-6 sm:max-w-sm sm:px-6 sm:ring-1 sm:ring-gray-900/10">
                        <div className="-ml-0.5 flex h-16 items-center gap-x-6">
                            <button type="button" onClick={() => setMobileMenuOpen(false)}
                                    className="-m-2.5 p-2.5 text-gray-700">
                                <span className="sr-only">Menü schließen</span>
                                <XMarkIcon aria-hidden="true" className="size-6"/>
                            </button>
                            <div className="-ml-0.5">
                                <a href="#" className="-m-1.5 block p-1.5">
                                    <span className="sr-only">Rubber Ducking</span>
                                    <Image
                                        alt="Logo"
                                        src={Logo}
                                        className="h-8 w-auto"
                                    />
                                </a>
                            </div>
                        </div>
                        <div className="mt-2 space-y-2">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </DialogPanel>
                </Dialog>
            </header>

            <main>
                <div className="relative isolate overflow-hidden pt-16">
                    {/* Secondary navigation */}
                    <header className="pt-6 pb-4 sm:pb-6">
                        <div
                            className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-4 sm:flex-nowrap sm:px-6 lg:px-8">
                            <h1 className="text-base/7 font-semibold text-gray-900">Umsatz</h1>
                            <div
                                className="order-last flex w-full gap-x-8 text-sm/6 font-semibold sm:order-0 sm:w-auto sm:border-l sm:border-gray-200 sm:pl-6 sm:text-sm/7">
                                {timePeriods.map((period) => (
                                    <a key={period.value} onClick={() => setCashflowDays(period.value)}
                                       className={`${cashflowDays === period.value ? 'text-indigo-600' : 'text-gray-700'} cursor-pointer hover:text-indigo-600 hover:scale-105 transition-transform`}>
                                        {period.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </header>

                    {/* Stats */}
                    <div className="border-b border-b-gray-900/10 lg:border-t lg:border-t-gray-900/5">
                        <dl className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:px-2 xl:px-0">
                            {stats.map((stat, statIdx) => (
                                <div
                                    key={stat.name}
                                    className={classNames(
                                        statIdx % 2 === 1 ? 'sm:border-l' : statIdx === 2 ? 'lg:border-l' : '',
                                        'flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-t border-gray-900/5 px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8',
                                    )}
                                >
                                    <dt className="text-sm/6 font-medium text-gray-500">{stat.name}</dt>
                                    <dd
                                        className={classNames(
                                            stat.changeType === 'negative' ? 'text-rose-600' : 'text-gray-700',
                                            'text-xs font-medium',
                                        )}
                                    >
                                        {stat.change}
                                    </dd>
                                    <dd className="w-full flex-none text-3xl/10 font-medium tracking-tight text-gray-900">
                                        {stat.value}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    <div
                        aria-hidden="true"
                        className="absolute top-full left-0 -z-10 mt-96 origin-top-left translate-y-40 -rotate-90 transform-gpu opacity-20 blur-3xl sm:left-1/2 sm:-mt-10 sm:-ml-96 sm:translate-y-0 sm:rotate-0 sm:transform-gpu sm:opacity-50"
                    >
                        <div
                            style={{
                                clipPath:
                                    'polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)',
                            }}
                            className="aspect-1154/678 w-288.5 bg-linear-to-br from-[#FF80B5] to-[#9089FC]"
                        />
                    </div>
                </div>

                <div className="space-y-16 py-16 xl:space-y-20">
                    {/* Recent activity table */}
                    <div>
                        <div className="flex items-center justify-between mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <h2 className="text-base/7 font-semibold text-gray-900">
                                Aktuelle Transaktionen
                            </h2>
                            <Link href="/admin/orders"
                                  className="text-sm/6 font-semibold text-indigo-600 hover:text-indigo-500">
                                Alle sehen
                            </Link>
                        </div>
                        <div className="mt-6 overflow-hidden border-t border-gray-100">
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                                    <table className="w-full text-left">
                                        <tbody>
                                        {days.map((day) => (
                                            <Fragment key={day.dateTime}>
                                                <tr className="text-sm/6 text-gray-900">
                                                    <th scope="colgroup" colSpan={3}
                                                        className="relative isolate py-2 font-semibold">
                                                        <time dateTime={day.dateTime}>{day.date}</time>
                                                        <div
                                                            className="absolute inset-y-0 right-full -z-10 w-screen border-b border-gray-200 bg-gray-50"/>
                                                        <div
                                                            className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-gray-200 bg-gray-50"/>
                                                    </th>
                                                </tr>
                                                {day.transactions.map((transaction) => (
                                                    <tr key={transaction.id}>
                                                        <td className="relative py-5 pr-6">
                                                            <div className="flex gap-x-6">
                                                                <div className="flex-auto">
                                                                    <div className="flex items-start gap-x-3">
                                                                        <div
                                                                            className="text-sm/6 font-medium text-gray-900">{transaction.customer}</div>
                                                                        <div
                                                                            className={classNames(
                                                                                statuses[transaction.status],
                                                                                'rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
                                                                            )}
                                                                        >
                                                                            {transaction.status}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="absolute right-full bottom-0 h-px w-screen bg-gray-100"/>
                                                            <div
                                                                className="absolute bottom-0 left-0 h-px w-screen bg-gray-100"/>
                                                        </td>
                                                        <td className="hidden py-5 pr-6 sm:table-cell">
                                                            <div
                                                                className="text-sm/6 text-gray-900 font-semibold">{transaction.amount}</div>
                                                            <div
                                                                className="mt-1 text-xs/5 text-gray-500">{transaction.itemCount} Artikel
                                                            </div>
                                                        </td>
                                                        <td className="py-5 text-right">
                                                            <div className="flex justify-end">
                                                                <Link
                                                                    href={'/admin/orders/' + transaction.orderNumber}
                                                                    className="text-sm/6 font-medium text-indigo-600 hover:text-indigo-500"
                                                                >
                                                                    Ansehen
                                                                </Link>
                                                            </div>
                                                            <div className="mt-1 text-xs/5 text-gray-500">
                                                                Bestellung <span
                                                                className="text-gray-900">#{transaction.orderNumber}</span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </Fragment>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent client list*/}
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                            <div className="flex items-center justify-between">
                                <h2 className="text-base/7 font-semibold text-gray-900">
                                    Neueste Kunden
                                </h2>
                                {
                                    /* INFO: Uncomment this section if you want to display a link to view all clients
                                        <Link href="/admin/customers" className="text-sm/6 font-semibold text-indigo-600 hover:text-indigo-500">View all<span className="sr-only">, clients</span></Link>
                                    */
                                }
                            </div>
                            <ul role="list" className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8">
                                {clients.map((client) => (
                                    <li key={client.id} className="overflow-hidden rounded-xl border border-gray-200">
                                        <div
                                            className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                                            <Image
                                                alt={client.name}
                                                src={client.imageUrl}
                                                width={48}
                                                height={48}
                                                className="size-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
                                            />
                                            <div className="text-sm/6 font-medium text-gray-900">{client.name}</div>
                                            {
                                                /* INFO: Uncomment this section if you want to display a link to view the client's profile
                                                    <Menu as="div" className="relative ml-auto">
                                                        <MenuButton
                                                            className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
                                                            <EllipsisHorizontalIcon aria-hidden="true" className="size-5"/>
                                                        </MenuButton>
                                                        <MenuItems
                                                            transition
                                                            className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                                                        >
                                                            <MenuItem>
                                                                <Link
                                                                    href={"/admin/customers/" + client.id}
                                                                    className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden">
                                                                    Ansehen
                                                                </Link>
                                                            </MenuItem>
                                                            <MenuItem>
                                                                <Link
                                                                    href={"/admin/customers/" + client.id + "/edit"}
                                                                    className="block px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-gray-50 data-focus:outline-hidden"
                                                                >
                                                                    Bearbeiten
                                                                </Link>
                                                            </MenuItem>
                                                        </MenuItems>
                                                    </Menu>
                                                 */
                                            }
                                        </div>
                                        <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm/6">
                                            <div className="flex justify-between gap-x-4 py-3">
                                                <dt className="text-gray-500">
                                                    Letzte Bestellung
                                                </dt>
                                                <dd className="text-gray-700">
                                                    <time
                                                        dateTime={client.lastOrder.dateTime}>{client.lastOrder.date}</time>
                                                </dd>
                                            </div>
                                            <div className="flex justify-between gap-x-4 py-3">
                                                <dt className="text-gray-500">
                                                    Betrag
                                                </dt>
                                                <dd className="flex items-start gap-x-2">
                                                    <div
                                                        className="font-medium text-gray-900">{client.lastOrder.amount}</div>
                                                    <div
                                                        className={classNames(
                                                            statuses[client.lastOrder.status],
                                                            'rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
                                                        )}
                                                    >
                                                        {client.lastOrder.status}
                                                    </div>
                                                </dd>
                                            </div>
                                        </dl>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
