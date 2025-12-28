import { useState, useMemo } from 'react';
import {
    Button,
    Card,
    Chip,
    Dropdown,
    SearchField
} from '@heroui/react';
import { Icon } from '@iconify/react';
import type { Invoice } from '@/types/billing';
import { getInvoiceStatusVariant, formatPrice, formatDate } from '@/utils/billing';

interface InvoiceHistoryTableProps {
    invoices: Invoice[];
}

export function InvoiceHistoryTable({ invoices }: InvoiceHistoryTableProps) {
    const [page, setPage] = useState(1);
    const [rowsPerPage] = useState(10);
    const [sortDescriptor, setSortDescriptor] = useState<{
        column: keyof Invoice;
        direction: "ascending" | "descending";
    }>({
        column: "date",
        direction: "descending",
    });
    const [filterValue, setFilterValue] = useState("");

    const pages = Math.ceil(invoices.length / rowsPerPage);

    const hasSearchFilter = Boolean(filterValue);

    const filteredItems = useMemo(() => {
        let filteredInvoices = [...invoices];

        if (hasSearchFilter) {
            filteredInvoices = filteredInvoices.filter((invoice) =>
                invoice.invoiceNumber.toLowerCase().includes(filterValue.toLowerCase()) ||
                invoice.id.toLowerCase().includes(filterValue.toLowerCase())
            );
        }

        return filteredInvoices.sort((a, b) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [invoices, filterValue, sortDescriptor, hasSearchFilter]);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const handleSort = (column: keyof Invoice) => {
        setSortDescriptor(prev => ({
            column,
            direction: prev.column === column && prev.direction === "ascending" ? "descending" : "ascending"
        }));
    };

    return (
        <Card className="flex flex-col">
            <Card.Header className="flex flex-row justify-between items-center pb-4">
                <h3 className="text-base font-semibold text-foreground">Invoice History</h3>
                <div className="flex gap-3">
                    <SearchField
                        aria-label="Search invoices"
                        className="w-full sm:max-w-[240px]"
                        value={filterValue}
                        onChange={setFilterValue}
                    >
                        <SearchField.Group>
                            <SearchField.SearchIcon className="text-default-400" />
                            <SearchField.Input placeholder="Search invoices..." />
                            <SearchField.ClearButton />
                        </SearchField.Group>
                    </SearchField>

                    <Dropdown>
                        <Dropdown.Trigger>
                            <Button variant="secondary">
                                <Icon icon="gravity-ui:arrow-down-to-line" />
                                Export
                            </Button>
                        </Dropdown.Trigger>
                        <Dropdown.Popover>
                            <Dropdown.Menu aria-label="Export Options">
                                <Dropdown.Item key="csv">Export as CSV</Dropdown.Item>
                                <Dropdown.Item key="pdf-zip">Download PDFs (ZIP)</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown.Popover>
                    </Dropdown>
                </div>
            </Card.Header>

            <Card.Content className="p-0 border-t border-default-100">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-default-50/50 border-b border-default-100 text-default-500 font-semibold uppercase tracking-wider">
                            <tr>
                                <th
                                    className="px-6 py-3"
                                    aria-sort={sortDescriptor.column === 'invoiceNumber' ? sortDescriptor.direction : 'none'}
                                >
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="flex items-center gap-1 hover:text-foreground transition-colors group text-default-500 font-semibold uppercase tracking-wider w-full justify-start p-0 h-auto min-w-0"
                                        onPress={() => handleSort('invoiceNumber')}
                                    >
                                        Number
                                        {sortDescriptor.column === 'invoiceNumber' && (
                                            <Icon icon={sortDescriptor.direction === 'ascending' ? "gravity-ui:chevron-up" : "gravity-ui:chevron-down"} />
                                        )}
                                    </Button>
                                </th>
                                <th
                                    className="px-6 py-3"
                                    aria-sort={sortDescriptor.column === 'date' ? sortDescriptor.direction : 'none'}
                                >
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="flex items-center gap-1 hover:text-foreground transition-colors group text-default-500 font-semibold uppercase tracking-wider w-full justify-start p-0 h-auto min-w-0"
                                        onPress={() => handleSort('date')}
                                    >
                                        Date
                                        {sortDescriptor.column === 'date' && (
                                            <Icon icon={sortDescriptor.direction === 'ascending' ? "gravity-ui:chevron-up" : "gravity-ui:chevron-down"} />
                                        )}
                                    </Button>
                                </th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3 text-right">Amount</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-default-100">
                            {items.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-default-500">
                                        No invoices found
                                    </td>
                                </tr>
                            ) : (
                                items.map((invoice) => (
                                    <tr key={invoice.id} className="hover:bg-default-50 transition-colors">
                                        <td className="px-6 py-4 font-medium">
                                            {invoice.invoiceNumber}
                                        </td>
                                        <td className="px-6 py-4 text-default-600">
                                            {formatDate(invoice.date)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Chip
                                                size="sm"
                                                variant="soft"
                                                color={getInvoiceStatusVariant(invoice.status)}
                                                className="capitalize font-medium px-3"
                                            >
                                                {invoice.status.replace('_', ' ')}
                                            </Chip>
                                        </td>
                                        <td className="px-6 py-4 text-right tabular-nums font-medium">
                                            {formatPrice(invoice.amount, invoice.currency)}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                isIconOnly
                                                aria-label="Download Invoice"
                                            >
                                                <Icon icon="gravity-ui:arrow-down-to-line" width={16} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card.Content>

            {pages > 0 && (
                <Card.Footer className="justify-center border-t border-default-100">
                    <div className="flex gap-2 items-center">
                        <Button
                            size="sm"
                            variant="ghost"
                            isDisabled={page === 1}
                            onPress={() => setPage(p => Math.max(1, p - 1))}
                        >
                            Previous
                        </Button>
                        <span className="text-sm font-medium px-2">
                            Page {page} of {pages}
                        </span>
                        <Button
                            size="sm"
                            variant="ghost"
                            isDisabled={page === pages}
                            onPress={() => setPage(p => Math.min(pages, p + 1))}
                        >
                            Next
                        </Button>
                    </div>
                </Card.Footer>
            )}
        </Card>
    );
}
