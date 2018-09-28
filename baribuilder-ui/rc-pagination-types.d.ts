// Could eventually contribute a more robust thing

declare module 'rc-pagination' {
  import * as React from 'react';

  export interface PaginationProps {
    defaultCurrent?: number;
    current?: number;
    total?: number;
    defaultPageSize?: number;
    pageSize?: number;
    onChange?: (current: number, pageSize: number) => void;
    showSizeChange?: boolean;
    pageSizeOptions?: string[];
    onShowSizeChange?: (current: number, pageSize: number) => void;
    hideOnSinglePage?: boolean;
    showPrevNextJumpers?: boolean;
    showQuickJumper?: boolean;
    showTotal?: (total: number, from?: number, to?: number) => void;
    className?: string;
  }

  class Pagination extends React.Component<PaginationProps> {}

  export default Pagination;
}

