from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator


class Pagination:
	def __init__(self):
		self._page = 1
		self._size = 10
		self._max_size = 100
		self._total_pages = 1
	
	@property
	def page(self):
		return self._page

	@page.setter
	def page(self, value):
		if value is not None:
			self._page = int(value)

	@property
	def size(self):
		return self._size

	@size.setter
	def size(self, value):
		if value is not None:
			if int(value) > self._max_size:
				self._size = self._max_size
			else:
				self._size = int(value)

	@property
	def total_pages(self):
		return self._total_pages

	@total_pages.setter
	def total_pages(self, value):
		if value is not None and isinstance(value, int):
			self._total_pages = value
	
	def paginate_data(self, data):
		paginator = Paginator(data, self.size)
		self.total_pages = paginator.num_pages

		try:
			data = paginator.page(self.page)
		except PageNotAnInteger:
			data = paginator.page(self.page)
		except EmptyPage:
			self._page = self.total_pages
			data = paginator.page(self.page)
		
		return data




def validate_page_size(request) ->tuple:
	original_page = 1
	original_size = 10
	page = request.query_params.get('page', '1')
	size = request.query_params.get('size', '10')

	if page.isdigit() and int(page) > 0:
		original_page = int(page)

	if size.isdigit() and int(size) > 0 and int(size) <= 100:
		original_size = int(size)

	return original_page, original_size