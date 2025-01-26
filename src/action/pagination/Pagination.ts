

export let paginationAction = {

    pagination: (pageLength: number, pageNumber: number): IPagination => {


        let pageNo = pageNumber;
        let PageL = pageLength;

        if (PageL <= -1) {
            PageL = 0
        }

        if (pageNo <= -1) {
            pageNo = 0
        }

        pageNo = (pageNo - 1) * PageL



        return {
            pageLength: PageL,
            pageNumber: pageNo
        }

    }
}

export interface IPagination {
    pageLength: number
    pageNumber: number
}