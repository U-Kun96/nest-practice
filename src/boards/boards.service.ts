/* eslint-disable @typescript-eslint/no-unused-vars */
import { Delete, Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(createBoardDto: CreateBoardDto) {
    const { title, description } = createBoardDto;

    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };
    this.boards.push(board);
    return board;
  }

  getBoardById(id: string): Board {
    // id로 게시물을 찾음 파라미터 = id, return 값은 하나이기 때문에 Board라고 지정해줌
    const post = this.boards.find((board) => board.id === id);
    // 찾고 싶은 게시글이 없을 때 에러를 던져주는 인스턴스를 생성해준다.
    if (!post) {
      throw new NotFoundException(
        `${id}에 해당하는 게시글이 존재하지 않습니다.`,
      );
    }
    return post;
  }

  deleteBoard(id: string): void {
    const post = this.getBoardById(id);

    if (!post) {
      throw new NotFoundException(`해당하는 게시물이 존재하지 않습니다`);
    }
    this.boards = this.boards.filter((board) => board.id !== post.id);
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id); // 업데이트 하고 싶은 게시물을 하나 찾아서 할당함
    board.status = status;
    return board;
  }
}
