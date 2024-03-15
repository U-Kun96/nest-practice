import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, BoardStatus } from './board.model';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private boardService: BoardsService) {}

  @Get('/')
  getAllBoard(): Board[] {
    return this.boardService.getAllBoards();
  }

  @Post()
  createBoard(
    @Body() createBoardDto: CreateBoardDto
  ): Board {
    return this.boardService.createBoard(createBoardDto);
  }

  @Get('/:id')
  // @param() 괄호 안에 특정한 것을 통해서 가져오고 싶을 때만 넣어주면 된다.
  getBoardById(@Param('id') id: string): Board {
    return this.boardService.getBoardById(id)
  }

  @Delete('/:id')
  deleteBoard(@Param('id') id:string): void {
    return this.boardService.deleteBoard(id)
  }
  
  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id') id: string,
    @Body('status') status: BoardStatus
    ) {
      return this.updateBoardStatus(id,status)
    }
}
